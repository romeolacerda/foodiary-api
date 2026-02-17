import { Button, Html, Tailwind } from "@react-email/components";
import React from "react";

export default function Email() {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                foodiary: {
                  green: '#64A30D'
                }
              }
            }
          }
        }}
      >
        <Button
          href="https://example.com"
          className="bg-foodiary-green text-white p-4 rounded-md font-sans"
        >
          Click ai fi
        </Button>
      </Tailwind>
    </Html>
  );
}
