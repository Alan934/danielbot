"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_DB_URL_AUTH ||
    "https://trdnrlxhjyifsuwaqiey.supabase.co", process.env.SUPABASE_DB_KEY || "");
exports.supabaseAdmin = (0, supabase_js_1.createClient)(process.env.SUPABASE_DB_URL_AUTH ||
    "https://trdnrlxhjyifsuwaqiey.supabase.co", process.env.SUPABASE_SERVICE_ROLE_KEY || "", {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
});
