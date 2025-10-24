-- Insert default roles
INSERT INTO user_roles (user_id, role) VALUES (1, 'USER') ON CONFLICT DO NOTHING;
INSERT INTO user_roles (user_id, role) VALUES (1, 'ADMIN') ON CONFLICT DO NOTHING;
