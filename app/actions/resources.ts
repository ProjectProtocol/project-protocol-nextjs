"use server";

export async function likeResource(formData: FormData) {
  const resourceId = formData.get("resourceId");
  console.log("Liking resource", resourceId);
}

export async function dislikeResource(formData: FormData) {
  const resourceId = formData.get("resourceId");

  console.log(`Disliking resource ${resourceId}`);
}
