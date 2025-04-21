import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>;

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json })=> {
          const response = await client.api.auth.login["$post"]({ json });
          
          if(!response.ok) {
            throw new Error("Failed to login");
          }
          
          return await response.json();
        },
        onSuccess: async () => {
          toast.success("Logged in");
          
          // Invalidate the current user query
          queryClient.invalidateQueries({queryKey: ["current"]});
          
          // Check if user has workspaces
          try {
            const workspacesResponse = await client.api.workspaces.$get();
            
            if (workspacesResponse.ok) {
              const { data } = await workspacesResponse.json();
              
              // If user has workspaces, redirect to their first workspace
              if (data.documents && data.documents.length > 0) {
                router.push(`/workspaces/${data.documents[0].$id}`);
              } else {
                // No workspaces, redirect to landing page
                router.push("/landingpage");
              }
            } else {
              // If API fails, redirect to landing page
              router.push("/landingpage");
            }
          } catch (error) {
            console.error("Error checking workspaces:", error);
            router.push("/landingpage");
          }
        },
        onError: () => {
          toast.error("Failed to login");
        }
    });

    return mutation;
};