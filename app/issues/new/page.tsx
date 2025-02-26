"use client"

import { Button, Callout,TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillInfoCircle, } from 'react-icons/ai';
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;


const NewIssuePage = () => {

    const router = useRouter();

    const [error, setError]  = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

     const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
     })

     

  return (
    <div className='space-y-3'>
      {error && (
        <Callout.Root color="red" size="1" className='max-w-xl '>
          <Callout.Icon>
            <AiFillInfoCircle />
          </Callout.Icon>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )
      }
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true)
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false)
            setError("An unexpected error occured.");
            console.log(error)
          }
        })}
      >
        <div className='flex flex-col '>
        <TextField.Root
          placeholder="Search the docs…"
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>
            {errors.title?.message}
        </ErrorMessage>
        </div>

        <div className='flex flex-col '>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
            <div className='-mt-8'>
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
            </div>
        </div>
        <Button type="submit" 
        disabled={isSubmitting}
        className='cursor-pointer  hover:violet-800 space-y-4'>
        
            Submit New Issue
            { isSubmitting && <Spinner />}

        </Button>
      </form>
    </div>
  );
}

export default NewIssuePage