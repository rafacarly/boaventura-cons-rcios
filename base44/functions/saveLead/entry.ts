import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.json();

  const { action, id, data } = body;

  if (action === "create") {
    const lead = await base44.asServiceRole.entities.Lead.create(data);
    return Response.json({ id: lead.id });
  }

  if (action === "update" && id) {
    await base44.asServiceRole.entities.Lead.update(id, data);
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
});