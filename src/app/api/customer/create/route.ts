import { RegisterFormData } from "@/src/app/register/page";
import { CreateCustomerService } from "@/src/services/CreateCustomerService";

export async function POST(request: Request) {
    const data: RegisterFormData = await request.json();
    const createCustomerService = new CreateCustomerService();
    await createCustomerService.execute(data);

    return new Response(null, { status: 201 });
}