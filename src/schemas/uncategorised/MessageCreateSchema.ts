import { InteractionType, Snowflake } from "@spacebar/util";
import { ActionRowComponent, ApplicationCommandType, Embed, PollAnswer, PollMedia, PublicUser } from "@spacebar/schemas";

export type MessageCreateAttachment = {
    id: string;
    filename: string;
};

export type MessageCreateCloudAttachment = {
    id?: string;
    filename: string;
    uploaded_filename: string;
    original_content_type?: string;
};

export interface MessageCreateSchema {
    type?: number;
    content?: string;
    mobile_network_type?: string;
    nonce?: string | number;
    channel_id?: string;
    tts?: boolean;
    flags?: number;
    embeds?: Embed[];
    embed?: Embed;
    allowed_mentions?: {
        parse?: string[];
        roles?: string[];
        users?: string[];
        replied_user?: boolean;
    };
    message_reference?: {
        message_id?: string;
        channel_id?: string;
        guild_id?: string;
        fail_if_not_exists?: boolean;
        type?: number;
    };
    payload_json?: string;
    file?: { filename: string };
    attachments?: (MessageCreateAttachment | MessageCreateCloudAttachment)[];
    sticker_ids?: string[] | null;
    components?: ActionRowComponent[] | null;
    poll?: PollCreationSchema;
    enforce_nonce?: boolean;
    applied_tags?: string[];
    thread_name?: string;
    avatar_url?: string;
    interaction?: MessageInteractionSchema;
    interaction_metadata?: MessageInteractionSchema;
}

export interface PollCreationSchema {
    question: PollMedia;
    answers: PollAnswer[];
    duration?: number;
    allow_multiselect?: boolean;
    layout_type?: number;
}

interface MessageInteractionSchema {
    id: string;
    type: InteractionType;
    name: string;
    command_type?: ApplicationCommandType;
    ephemerality_reason?: number;
    user?: PublicUser;
    user_id?: string;
    authorizing_integration_owners?: object;
    original_response_message_id?: Snowflake;
    interacted_message_id?: Snowflake;
    triggering_interaction_metadata?: MessageInteractionSchema;
    target_user?: PublicUser;
    target_message_id?: Snowflake;
}
