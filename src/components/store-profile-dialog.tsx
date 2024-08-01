import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from '@/api/metrics/get-managed-restaurant'
import { putProfile } from '@/api/profile/put-profile'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managedRestaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity, // tempo em que os dados buscados se tornam obsoletos
  })

  type StoreProfileSchema = z.infer<typeof storeProfileSchema>

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      // fica observando o valor, dai ao contrário do default, espera a requisição.
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managedRestaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managedRestaurant'],
        {
          ...cached,
          name,
          description,
        },
      )
    }

    return { cached } // informação do meu cache antes de eu atualizar
  }
  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: putProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description })
      return { previousProfile: cached }
    }, // dispara quando clico no botão de salvar, e não só no sucesso
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    }, // contexto -> informações que consigo compartilhar entre o contexto de uma mutação ou de uma query. tudo o que eu retorno do meu onMutate é adicionado nesse contexto
  })

  async function handleUpdateProfile(body: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: body.name,
        description: body.description,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar perfil')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>Perfil da loja</DialogHeader>
      <DialogDescription>
        Atualize as informações do seu estabelecimento visíveis ao seu cliente
      </DialogDescription>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="Name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="Name"
              {...register('description')}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button disabled={isSubmitting} type="submit" variant="sucess">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
