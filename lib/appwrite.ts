import {
  Client,
  Account,
  ID,
  Databases,
  OAuthProvider,
  Avatars,
  Query,
  Storage,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.jsm.self-care-app",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
  bucketId: process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID,
  selfassessmentCollectionID: process.env.EXPO_PUBLIC_APPWRITE_SELF_ASSESSMENT_COLLECTION_ID
};

export const client = new Client();
client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Create OAuth2 token failed");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Create OAuth2 token failed");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result, 
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// // export async function getLatestProperties() {
// //   try {
// //     const result = await databases.listDocuments(
// //       config.databaseId!,
// //       config.propertiesCollectionId!,
// //       [Query.orderAsc("$createdAt"), Query.limit(5)]
// //     );

// //     return result.documents;
// //   } catch (error) {
// //     console.error(error);
// //     return [];
// //   }
// // }

// // export async function getProperties({
// //   filter,
// //   query,
// //   limit,
// // }: {
// //   filter: string;
// //   query: string;
// //   limit?: number;
// // }) {
// //   try {
// //     // Use the correct collection ID (agentsCollectionId in this case)
// //     const result = await databases.listDocuments(
// //       config.databaseId!,
// //       config.agentsCollectionId!, // Use agentsCollectionId here
// //       [
// //         Query.orderDesc("$createdAt"),
// //         Query.limit(limit || 6), // Default limit to 6 if no limit passed
// //       ]
// //     );
// //     return result.documents;
// //   } catch (error) {
// //     console.error(error);
// //     return [];
// //   }
// // }

// // // write function to get property by id
// // export async function getPropertyById({ id }: { id: string }) {
// //   try {
// //     const result = await databases.getDocument(
// //       config.databaseId!,
// //       config.propertiesCollectionId!,
// //       id
// //     );
// //     return result;
// //   } catch (error) {
// //     console.error(error);
// //     return null;
// //   }
// // }


export async function getYouTubeVideos() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.selfassessmentCollectionID!, // Make sure this is added in config
      [Query.orderDesc("$createdAt")]
    );

    return result.documents;
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}