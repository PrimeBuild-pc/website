import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import SchemaMarkup from "@/components/SchemaMarkup";
import CookieBanner from "@/components/CookieBanner";
import SkipLink from "@/components/SkipLink";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SchemaMarkup />
      <SkipLink />
      <div className="flex flex-col min-h-screen bg-black text-white font-inter">
        <NavBar />
        <main id="main-content" className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
      <CookieBanner />
    </QueryClientProvider>
  );
}

export default App;
