/** Community links sourced from environment variables, validated with Zod */
import { z } from 'astro/zod';

const communityEnvSchema = z.object({
  DISCORD_INVITE_URL: z.url().optional().default('#'),
});

export const { DISCORD_INVITE_URL } = communityEnvSchema.parse({
  DISCORD_INVITE_URL: import.meta.env.DISCORD_INVITE_URL,
});
