import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tcncgbbvehkqtpefhpwt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbmNnYmJ2ZWhrcXRwZWZocHd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDM2MjgsImV4cCI6MjA2NzYxOTYyOH0.FxItTqNHuqfmbuRVOsDxsOR_zho8Z8K1K2UuqvO2VRY';
export const supabase = createClient(supabaseUrl, supabaseKey);