import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import CookieBanner from "@/components/CookieBanner";
import SkipLink from "@/components/SkipLink";
import { Toaster } from "@/components/ui/toaster";

const Privacy = lazy(() => import("@/pages/Privacy"));
const About = lazy(() => import("@/pages/About"));
const Guides = lazy(() => import("@/pages/Guides"));
const GuideDetail = lazy(() => import("@/pages/GuideDetail"));
const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

const Router = () => (
  <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/chi-siamo" component={About} />
      <Route path="/guides" component={Guides} />
      <Route path="/guides/:slug" component={GuideDetail} />
      <Route path="/servizi/:slug" component={ServiceDetail} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

const App = () => (
  <>
    <SchemaMarkup />
    <SkipLink />
    <div className="flex min-h-screen flex-col bg-[#050505] text-white">
      <NavBar />
      <main id="main-content" className="flex-grow"><Router /></main>
      <Footer />
    </div>
    <Toaster />
    <CookieBanner />
  </>
);

export default App;
