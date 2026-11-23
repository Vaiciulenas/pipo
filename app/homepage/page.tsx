import { redirect } from "next/navigation";

// Old URL, kept so existing links still work
export default function HomepageRedirect() {
  redirect("/");
}
