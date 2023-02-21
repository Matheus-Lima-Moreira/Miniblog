import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // deal with memory leak
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    const loadData = async (params) => {
      if (isCancelled) return;
      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        // Search for tags
        if (search) {
          q = await query(
            collectionRef,
            where('tags', 'array-contains', search),
            orderBy('createdAt', 'desc')
          );
        } 
        
        // Search for user posts
        else if (uid) {
          q = await query(
            collectionRef,
            where('uid', '==', uid),
            orderBy('createdAt', 'desc')
          );          
        } 
        
        // Get all posts
        else {
          q = await query(
            collectionRef,
            orderBy('createdAt', 'desc')
          );
        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          )
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [docCollection, search, uid, isCancelled]);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { documents, loading, error };
};