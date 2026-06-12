-- ==========================================================
-- Atualiza texto "Sobre" (bloco profissional) com a trajetória
-- de carreira (Correios -> BCR.CX -> Digital Head Solutions
-- Consultant), conforme dados do LinkedIn.
-- ==========================================================

update public.site_config
set value = jsonb_set(
  value,
  '{about_professional}',
  '"Fabio começou a carreira em 2013 nos Correios e migrou para o atendimento ao cliente em 2015. Ao longo de quase 11 anos na BCR.CX, evoluiu de Analista de Customer Service para Back Office, depois Supervisor de Operações e hoje atua como Digital Head Solutions Consultant, liderando a equipe responsável pela implementação e suporte de plataformas de atendimento para clientes de grande porte como Adobe, Lacoste, Bauducco, Pandora e Natura. É especialista Zendesk com certificações em toda a suíte — Support, Guide, Talk, Messaging, Sell, Implementation e AI Agents —, atua também com Inteligência Artificial e automações (Make, Zapier, n8n), e é fundador da Full Solutions."'::jsonb
)
where key = 'content';
