import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useOwnerCheck = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("check-owner");
        
        if (error) {
          console.error("Error checking owner:", error);
          setIsOwner(false);
        } else {
          setIsOwner(data?.isOwner === true);
        }
      } catch (error) {
        console.error("Error checking owner:", error);
        setIsOwner(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkOwner();
  }, []);

  return { isOwner, isLoading };
};
