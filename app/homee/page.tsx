"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function HOMEE() {
  const [txt, setTxt] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [ans, setans] = useState<any>(null);
  const { toast } = useToast();

  async function checkIfTrue() {
    if (txt === "") {
      if (!txt) {
        toast({
          title: "ERROR!!!",
          description: "write something please!!!",
          variant: "destructive",
        });
      }
      return;
    }

    setisLoading(true)
    setans(null)

    try {
      let resp = await fetch("https://vercify-api-call.vercel.app/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: txt }),
      });

      let d = await resp.json();
      
      setTimeout(() => {
        setans(d);
        setisLoading(false);
      }, 2000);

    } catch (e) {
      toast({
        title: "OOPS!!!",
        description: "something went wrong try again!!!",
        variant: "destructive",
      });
      setisLoading(false)
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">CHECK IF TRUE OR FALSE</h1>
            <p className="text-muted-foreground text-lg">
              type anything and AI will check it
            </p>
          </div>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>CHECK HERE</CardTitle>
            <CardDescription>
              type here what u want to check
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="type here..."
              className="min-h-[150px]"
              value={txt}
              onChange={(e) => {setTxt(e.target.value)}}
            />
            <Button 
              className={isLoading ? "w-full" : "w-full"}
              onClick={() => {
                checkIfTrue()
              }}
              disabled={isLoading ? true : false}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Let me think..." : "Check Now!!!"}
            </Button>
          </CardContent>
        </Card>

        {ans ? (
          ans !== null ? (
            <Card>
              <CardHeader>
                <CardTitle>RESULT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="font-semibold">Status:</div>
                  <div className="text-muted-foreground">{ans.status}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Score:</div>
                  <div className="text-muted-foreground">{ans.score}/10</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-semibold">Explanation:</div>
                  <div className="text-muted-foreground">{ans.verification_details}</div>
                </div>
              </CardContent>
            </Card>
          ) : null
        ) : null}
      </div>
    </div>
  );
}

export default HOMEE;
