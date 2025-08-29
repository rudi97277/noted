import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEncryptedLocalStorage from "@/utilities/storage.util";
import { useRef } from "react";
import { Outlet } from "react-router";

export default function BaseLayout() {
  const [accessKey, setAccessKey] = useEncryptedLocalStorage<string>(
    "access-key",
    ""
  );
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className="mobile h-dvh flex flex-col">
      {accessKey ? (
        <Outlet />
      ) : (
        <div className="flex flex-col gap-2 p-2 w-full h-full items-center justify-center">
          <Input
            type="password"
            ref={ref}
            placeholder="Access key"
            className="text-center"
          />
          <Button
            onClick={() => {
              if (ref.current?.value) {
                setAccessKey(ref.current.value);
              }
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
}
