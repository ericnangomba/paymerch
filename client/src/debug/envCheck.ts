// Debug file to verify Vite environment variables are loaded
// This is just for development debugging

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('=== Environment Variables Debug ===')
console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Loaded' : '❌ Missing')
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Loaded' : '❌ Missing')
console.log('Full URL:', supabaseUrl)
console.log('Full Key (first 50 chars):', supabaseAnonKey?.substring(0, 50))
console.log('=====================================')

export { supabaseUrl, supabaseAnonKey }
