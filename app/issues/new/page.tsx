"use client"

import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import "easymde/dist/easymde.min.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillInfoCircle, } from 'react-icons/ai';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {

    const router = useRouter();

    const [error, setError]  = useState('')

     const {register, control, handleSubmit} = useForm<IssueForm>()

     

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
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occured.");
          }
        })}
      >
        <TextField.Root
          placeholder="Search the docs…"
          {...register("title")}
        ></TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button type="submit" className='cursor-pointer  hover:violet-800'>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage