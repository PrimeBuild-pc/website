import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
import Guides from "@/pages/Guides";
import GuideDetail from "@/pages/GuideDetail";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/not-found";
import SchemaMarkup from "@/components/SchemaMarkup";
import CookieBanner from "@/components/CookieBanner";
import SkipLink from "@/components/SkipLink";
import { MotionConfig } from "framer-motion";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/guides" component={Guides} />
      <Route path="/guides/:slug" component={GuideDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <SchemaMarkup />
        <SkipLink />
        <div className="flex min-h-screen flex-col bg-black text-white font-inter">
          <NavBar />
          <main id="main-content" className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
        <CookieBanner />
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
