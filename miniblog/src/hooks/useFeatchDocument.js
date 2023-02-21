import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // deal with memory leak
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const loadDocument = async (params) => {
      if (isCancelled) return;
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());

      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadDocument();

  }, [docCollection, id, isCancelled]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { document, loading, error };
};