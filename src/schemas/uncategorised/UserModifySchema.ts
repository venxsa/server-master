import { User_DisplayNameEffect, User_DisplayNameFont } from "discord-protos";

export interface UserModifySchema {
    username?: string;
    global_name?: string;
    display_name?: string;
    avatar?: string | null;
    bio?: string;
    accent_color?: number;
    banner?: string | null;
    password?: string;
    new_password?: string;
    code?: string;
    email?: string;
    discriminator?: string;
    pronouns?: string;
    display_name_colors?: number[];
    display_name_effect_id?: User_DisplayNameEffect;
    display_name_font_id?: User_DisplayNameFont;
    [key: string]: any;
}

export interface TotpEnableSchema {
    password: string;
    code?: string;
    secret?: string;
}
