import { ConnectedAccountSchema, Snowflake, UserSettingsSchema } from "@spacebar/schemas";
import { BitField } from "@spacebar/util/util";
import { Relationship, Session } from "@spacebar/util/entities";

interface UserEntityPleaseRewriteThankYou {
    id: Snowflake;
    username: string;
    discriminator: string;
    avatar?: string;
    accent_color?: number;
    banner?: string;
    theme_colors?: number[];
    pronouns?: string;
    phone?: string;
    desktop: boolean;
    mobile: boolean;
    premium: boolean;
    premium_type: number;
    bot: boolean;
    bio: string;
    system: boolean;
    nsfw_allowed: boolean;
    mfa_enabled: boolean;
    webauthn_enabled: boolean;
    created_at: Date;
    premium_since: Date;
    verified: boolean;
    disabled: boolean;
    deleted: boolean;
    email?: string;
    flags: number;
    public_flags: number;
    purchased_flags: number;
    premium_usage_flags: number;
    rights: string;
    sessions: Session[];
    relationships: Relationship[];
    connected_accounts: ConnectedAccountSchema[];
    fingerprints: string[];
    settings?: UserSettingsSchema;
    badge_ids?: string[];
    avatar_decoration_data?: AvatarDecorationData;
    display_name_styles?: DisplayNameStyle;
    collectibles?: Collectibles;
    primary_guild?: PrimaryGuild;
}

export interface PartialUser {
    id: Snowflake;
    username: string;
    discriminator: string;
    global_name?: string | null;
    avatar: string | null;
    avatar_decoration_data?: AvatarDecorationData | null;
    collectibles?: Collectibles | null;
    display_name_styles?: DisplayNameStyle | null;
    primary_guild?: PrimaryGuild | null;
    bot?: boolean;
    system?: boolean;
    banner?: string | null;
    accent_color?: number | null;
    public_flags?: number;
}

export interface AvatarDecorationData {
    asset: string;
    sku_id: Snowflake;
    expires_at: string | null;
}

export interface Collectibles {
    nameplate: NameplateData | null;
}

export interface NameplateData {
    asset: string;
    sku_id: Snowflake;
    label: string;
    palette: string;
    expires_at: number | null;
}

export interface DisplayNameStyle {
    font_id: number;
    effect_id: number;
    colors: number[];
}

export interface PrimaryGuild {
    identity_enabled: boolean | null;
    identity_guild_id: Snowflake | null;
    tag: string | null;
    badge: string | null;
}

export enum PublicUserEnum {
    username,
    discriminator,
    id,
    public_flags,
    avatar,
    accent_color,
    banner,
    bio,
    bot,
    premium_since,
    premium_type,
    premium,
    theme_colors,
    pronouns,
    badge_ids,
    avatar_decoration_data,
    display_name_styles,
    collectibles,
    primary_guild,
}
export type PublicUserKeys = keyof typeof PublicUserEnum;

export enum PrivateUserEnum {
    flags,
    mfa_enabled,
    email,
    phone,
    verified,
    nsfw_allowed,
    premium,
    premium_type,
    purchased_flags,
    premium_usage_flags,
    disabled,
    settings,
}

export type PrivateUserKeys = keyof typeof PrivateUserEnum | PublicUserKeys;

export const PublicUserProjection = Object.values(PublicUserEnum).filter((x) => typeof x === "string") as PublicUserKeys[];
export const PrivateUserProjection = [...PublicUserProjection, ...Object.values(PrivateUserEnum).filter((x) => typeof x === "string")] as PrivateUserKeys[];

export type PublicUser = Pick<UserEntityPleaseRewriteThankYou, PublicUserKeys>;
export type PrivateUser = Pick<UserEntityPleaseRewriteThankYou, PrivateUserKeys>;

export interface UserPrivate extends Pick<UserEntityPleaseRewriteThankYou, PrivateUserKeys> {
    locale: string;
}

export class UserFlags extends BitField {
    static FLAGS = {
        DISCORD_EMPLOYEE: 1n << 0n,
        PARTNERED_SERVER_OWNER: 1n << 1n,
        HYPESQUAD_EVENTS: 1n << 2n,
        BUGHUNTER_LEVEL_1: 1n << 3n,
        MFA_SMS: 1n << 4n,
        PREMIUM_PROMO_DISMISSED: 1n << 5n,
        HOUSE_BRAVERY: 1n << 6n,
        HOUSE_BRILLIANCE: 1n << 7n,
        HOUSE_BALANCE: 1n << 8n,
        EARLY_SUPPORTER: 1n << 9n,
        TEAM_USER: 1n << 10n,
        TRUST_AND_SAFETY: 1n << 11n,
        SYSTEM: 1n << 12n,
        HAS_UNREAD_URGENT_MESSAGES: 1n << 13n,
        BUGHUNTER_LEVEL_2: 1n << 14n,
        UNDERAGE_DELETED: 1n << 15n,
        VERIFIED_BOT: 1n << 16n,
        EARLY_VERIFIED_BOT_DEVELOPER: 1n << 17n,
        CERTIFIED_MODERATOR: 1n << 18n,
        BOT_HTTP_INTERACTIONS: 1n << 19n,
        SPAMMER: 1n << 20n,
        DISABLE_PREMIUM: 1n << 21n,
        ACTIVE_DEVELOPER: 1n << 22n,
        PROVISIONAL_ACCOUNT: 1n << 23n,
        HIGH_GLOBAL_RATE_LIMIT: 1n << 33n,
        DELETED: 1n << 34n,
        DISABLED_SUSPICIOUS_ACCOUNT: 1n << 35n,
        SELF_DELETED: 1n << 36n,
        PREMIUM_DISCIRMINATOR: 1n << 37n,
        USED_DESKTOP_CLIENT: 1n << 38n,
        USED_WEB_CLIENT: 1n << 39n,
        USED_MOBILE_CLIENT: 1n << 40n,
        DISABLED: 1n << 41n,
        HAS_SESSION_STARTED: 1n << 43n,
        QUARANTINED: 1n << 44n,
        PREMIUM_ELEGIBLE_FOR_UNIQUE_USERNAME: 1n << 47n,
        COLLABORATOR: 1n << 50n,
        RESTRICTED_COLLABORATOR: 1n << 51n,
    };
}
