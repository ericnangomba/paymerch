import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

console.log('🔍 Supabase Configuration:')
console.log('  URL:', isConfigured ? `✅ Configured (${supabaseUrl!.split('.')[0]}....)` : '❌ Missing')
console.log('  Key:', isConfigured ? '✅ Configured' : '❌ Missing')

const fallbackAuth = {
  getSession: async () => ({ data: { session: null }, error: null }),
  onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => undefined } } }),
  signOut: async () => ({ error: null }),
}

const fallbackClient = {
  auth: fallbackAuth,
  from: () => ({
    select: async () => ({ data: [], error: null }),
    insert: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
  }),
} as any

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : fallbackClient

if (!isConfigured) {
  console.warn('⚠️ Supabase credentials are not configured. Running in demo mode without auth.')
} else {
  console.log('✅ Supabase client ready')
}