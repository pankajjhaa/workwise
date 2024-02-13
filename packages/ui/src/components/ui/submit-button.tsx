import {ReloadIcon} from "@radix-ui/react-icons";
import {Button} from "@repo/ui/components/ui/button";
import * as React from "react";

const SubmitButton = ({loading, text, id}: {
  loading: boolean
  text: string
  id?: string
}) => {
  return <>
    <Button id={id} type="submit" disabled={loading} className={"w-full"}>
      {loading ?
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> : ''}
      {text}</Button>
  </>
}

export default SubmitButton
