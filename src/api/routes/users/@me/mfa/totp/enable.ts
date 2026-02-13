import { route } from "@spacebar/api";
import { User, generateMfaBackupCodes, generateToken, Config } from "@spacebar/util";
import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { HTTPError } from "lambert-server";
import { verifyToken, generateSecret } from "node-2fa";
import { TotpEnableSchema } from "@spacebar/schemas";

const router = Router({ mergeParams: true });

router.post(
    "/",
    route({
        requestBody: "TotpEnableSchema",
        responses: {
            200: {
                body: "TokenWithBackupCodesResponse",
            },
            400: {
                body: "APIErrorResponse",
            },
            404: {
                body: "APIErrorResponse",
            },
        },
    }),
    async (req: Request, res: Response) => {
        const body = req.body as TotpEnableSchema;

        const user = await User.findOneOrFail({
            where: { id: req.user_id },
            select: { data: true, email: true, username: true },
        });

        if (user.data.hash) {
            if (!(await bcrypt.compare(body.password, user.data.hash))) {
                throw new HTTPError(req.t("auth:login.INVALID_PASSWORD"));
            }
        }

        if (!body.code) {
            const instanceName = Config.get().general.instanceName || "Spacebar";
            const secret = generateSecret({
                name: instanceName,
                account: user.email || user.username,
            });

            return res.send({
                secret: secret.secret,
                otpauth_url: secret.uri,
            });
        }

        if (!body.secret) throw new HTTPError(req.t("auth:login.INVALID_TOTP_SECRET"), 60005);

        const code = body.code.replace(/\s/g, "");
        if (verifyToken(body.secret, code)?.delta != 0) throw new HTTPError(req.t("auth:login.INVALID_TOTP_CODE"), 60008);

        const backup_codes = generateMfaBackupCodes(req.user_id);
        await Promise.all(backup_codes.map((x) => x.save()));
        await User.update({ id: req.user_id }, { mfa_enabled: true, totp_secret: body.secret });

        res.send({
            token: await generateToken(user.id),
            backup_codes: backup_codes.map((x) => ({
                ...x,
                expired: undefined,
            })),
        });
    },
);

export default router;
