import { createLogin } from "../../http/create-login";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { Input } from "./input";
import { Button } from "./button";

const createLoginSchema = z.object({
    email: z.string().min(1, 'Informe o Email'),
    password: z.string().min(1, 'Informe a sua senha')
  })
  type CreateLoginSchema = z.infer<typeof createLoginSchema>
export function CreateLogin() {
    const {
        handleSubmit
      } = useForm<CreateLoginSchema>({
        resolver: zodResolver(createLoginSchema)
      })
    
      async function handleCreateLogin({
        email,
        password,
      }: CreateLoginSchema) {
        try {
          await createLogin({
            email, 
            password
          })
          toast.success('Login criado com sucesso')
        } catch {
          toast.error('Erro ao criar o login')
        }
      }
    return(
        <div className="bg-zinc-800 h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center justify-center max-w-[540px] py-10 px-5 w-full bg-zinc-600">
        <h1 className="text-white text-2xl ">Login</h1>
        <form onSubmit={handleSubmit(handleCreateLogin)} action="" className=" flex-1 flex flex-col items-center justify-between gap-5">
          <Input type="text" placeholder="Digite seu email:"/>
          <Input type="password" name="" id="" placeholder="Digite sua senha:"/>
          <Button variant="secondary" className="flex-1">Fazer Login</Button>
        </form>
      </div>
    </div>
    )
}