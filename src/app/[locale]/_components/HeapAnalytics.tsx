"use client";

import { useAuth } from "@/components/AuthProvider";
import Script from "next/script";
import { useEffect } from "react";

type hWindow = Window & {
  heap?: {
    identify: (id: string) => void;
    identity?: string;
    resetIdentity: () => void;
    addUserProperties: (props: any) => void;
  };
};
export default function HeapAnalytics() {
  const { user } = useAuth();
  const { heap } = window as hWindow;
  useEffect(() => {
    if (heap) {
      if (user && !heap.identity) {
        const { email, ...rest } = user;
        heap.identify(btoa(email));
        heap.addUserProperties(rest);
      } else if (heap?.identity) {
        heap.resetIdentity();
      }
    }
  }, [user, heap]);

  return (
    <Script
      id="heap-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
      window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};
      heap.load("2830100958");
      `,
      }}
    />
  );
}
