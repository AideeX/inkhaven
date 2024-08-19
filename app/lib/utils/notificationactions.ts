import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { db } from '@/app/lib/firebase/config';

export const triggerNotification = async ({
  type,
  sourceUserId,
  targetProfileId,
  targetPostId,
  message,
}: {
  type: 'like' | 'comment' | 'reply' | 'follow';
  sourceUserId: string;
  targetProfileId: string;
  targetPostId?: string;
  message: string;
}) => {
  const notificationId = doc(collection(db, 'notifications')).id; 
  const notificationRef = doc(db, 'notifications', notificationId); 

  await setDoc(notificationRef, {
    type,                    
    sourceUserId,            
    targetProfileId,       
    targetPostId,           
    message,               
    createdAt: serverTimestamp(), 
  });
};
