"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Readme } from "@prisma/client";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { FileIcon } from "lucide-react";

export function ReadmePreview({ readme }: { readme: Readme }) {
  return (
    <Card id="preview" className="h-full min-h-screen md:min-h-auto gap-0 p-0">
      <Tabs className="h-full gap-0" defaultValue="preview">
        <CardHeader className="h-18 p-4! border-b">
          <CardTitle>Preview</CardTitle>

          <CardAction>
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>
          </CardAction>
        </CardHeader>

        {readme?.content ? (
          <CardContent className="bg-gray-900 p-4">
            <TabsContent value="preview">
              <div className="prose prose-invert p-4">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readme?.content}
                </ReactMarkdown>
              </div>
            </TabsContent>

            <TabsContent value="raw">
              <div className="w-full p-4">
                <pre className="whitespace-pre-wrap text-muted">
                  {readme?.content}
                </pre>
              </div>
            </TabsContent>
          </CardContent>
        ) : (
          <CardContent className="h-full dark p-4">
            <Empty className="py-25">
              <EmptyHeader>
                <EmptyMedia variant="default">
                  <FileIcon />
                </EmptyMedia>
                <EmptyTitle>Preview Here</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                  Fill out the form on the left side and click{" "}
                  <span className="text-primary font-semibold">
                    Generate README
                  </span>
                  .
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        )}
      </Tabs>
    </Card>
  );
}
