import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug logging
console.log('🔍 Supabase Configuration:')
console.log('  URL:', supabaseUrl ? `✅ Configured (${supabaseUrl.split('.')[0]}....)` : '❌ Missing')
console.log('  Key:', supabaseAnonKey ? '✅ Configured' : '❌ Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 
    'Supabase credentials are not configured.\n' +
    'Make sure your .env file has:\n' +
    '  VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
    '  VITE_SUPABASE_ANON_KEY=your-anon-key-here'
  console.error('❌', errorMsg)
  throw new Error(errorMsg)
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log('✅ Supabase client ready')