import { supabase } from '../../supabase/supabase';
import { Request, Response } from 'express';

// Controller for user operations
const userController = {
  signUp: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(200).json({ message: 'User signed up successfully', data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // You can customize the response as needed
      return res.status(200).json({ message: 'User logged in successfully', data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
      const { data, error } = await supabase.auth.getUser(userId);

      if (error) {
        return res.status(404).json({ error: 'User not found' });
      }

      // You can customize the response as needed
      return res.status(200).json({ data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  signInWithOtp: async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: 'example@email.com',
        options: {
          emailRedirectTo: 'http://localhost:8000/welcome'
        }
      })

      if (error) {
        return res.status(400).json({ error: error.message });
      }

    } catch(err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  signOut: async (req: Request, res: Response) => {
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(404).json({ error: 'User not found' });
      }

      // You can customize the response as needed
      return res.status(200).json({ message: 'User signOut successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default userController;