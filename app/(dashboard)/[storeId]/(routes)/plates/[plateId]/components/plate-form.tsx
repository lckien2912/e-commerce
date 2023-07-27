"use client";

import { useState } from "react";
import axios from "axios";
import { Plate } from "@prisma/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  material: z.string().min(1),
});

interface PlateFormProps {
  initialData: Plate | null;
}

type PlateFormValues = z.infer<typeof formSchema>;

const PlateForm: React.FC<PlateFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit plate" : "Create plate";
  const description = initialData ? "Edit a plate" : "Add a new plate";
  const toastMsg = initialData ? "Plate updated" : "Plate created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<PlateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", material: "" },
  });

  const onSubmit = async (data: PlateFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/plates/${params.plateId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/plates`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/plates`);
      toast({ description: toastMsg });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/plates/${params.plateId}`);
      router.refresh();
      router.push(`/${params.storeId}/plates`);
      toast({ description: "Plate deleted." });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Warning",
        description:
          "Make sure you removed all products using this plate first.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Plate name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Plate material"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default PlateForm;
