import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json }) => {
          try{
            const response = await client.api.auth.register["$post"]({ json });

            if(!response.ok) {
              throw new Error("Failed to sign up");
            }

            return await response.json();
          }catch(e){
            console.log(e)
            return Promise.reject(e);
          }
        },
        onSuccess: () => {
          toast.success("Signed up");
          
          // Invalidate the current user query
          queryClient.invalidateQueries({queryKey: ["current"]});
          
          // After registration, guide user to create their first workspace
          router.push("/landingpage");
        },
        onError: () => {
          toast.error("Failed to sign up");
        }
    });

    return mutation;
};