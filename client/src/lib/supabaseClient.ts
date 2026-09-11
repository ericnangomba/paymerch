import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_ANON_KEY as string | undefined

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

console.log('🔍 Supabase Configuration:')
console.log('  URL:', isConfigured ? `✅ Configured (${supabaseUrl!.split('.')[0]}....)` : '❌ Missing')
console.log('  Key:', isConfigured ? '✅ Configured' : '❌ Missing')

export const supabase = isConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null

if (!isConfigured) {
  console.warn('⚠️ Supabase credentials are not configured. Running in demo mode without auth.')
} else {
  console.log('✅ Supabase client ready')
}