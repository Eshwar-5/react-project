// src/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sbjgoxiqpjgpgxwoykpv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNiamdveGlxcGpncGd4d295a3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNDExNzksImV4cCI6MjA3OTYxNzE3OX0.APTrE8HUl_YfYtvWevwZHJPCrxz1s9SEUFUZOxq0qxQ.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYnh2aHlzaWt0Y2Voc3htdHdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzQ2NjEsImV4cCI6MjA3OTYxMDY2MX0.bhIBt4GRx_F6z8W_EIH6s0rbG6-dkxG7kxm0IJfoILQ";

export const supabase = createClient(supabaseUrl, supabaseKey);