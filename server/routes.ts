import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve SEO specific files with correct content types
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.resolve('./public/robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.resolve('./public/sitemap.xml'));
  });

  app.get('/health-check.html', (req, res) => {
    res.type('text/html');
    res.sendFile(path.resolve('./public/health-check.html'));
  });

  app.get('/google-site-verification.html', (req, res) => {
    res.type('text/html');
    res.sendFile(path.resolve('./public/google-site-verification.html'));
  });

  // API endpoint to handle contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'All fields are required' 
        });
      }
      
      // Here you would typically save to a database or send an email
      // For now, just return success
      
      return res.status(200).json({
        success: true,
        message: 'Message received successfully!'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Server error, please try again later'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
