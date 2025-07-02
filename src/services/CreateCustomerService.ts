import { ApiNotFoundException } from "../exceptions/ApiNotFoundException";
import { RegisterFormData } from "../app/register/page";
import { AccessDeniedException } from "../exceptions/AccessDeniedException";

export class CreateCustomerService {
    private BASE_URL_API: string | undefined = process.env.BASE_URL_API;

    public async execute(data: RegisterFormData) {
        if (this.BASE_URL_API === undefined) {
            throw new ApiNotFoundException();
        }

        const response: Response = await fetch(`${this.BASE_URL_API}/customer/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).catch(() => { throw new ApiNotFoundException(); });

        if (response.status === 401) {
            throw new AccessDeniedException();
        }

        if (response.status !== 201) {
            const data = await response.json();

            throw new Error(data.message);
        }
    }
}