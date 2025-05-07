import prismaClient from "../../database";

class EventRepository {
  async createEvent(event: EventDto) {
    return await prismaClient.event.create({
      data: {
        ...event,
        id: undefined, // Prisma will auto-generate the ID
      },
    });
  }

  async getEventById(id: string) {
    return await prismaClient.event.findUnique({
      where: { id },
    });
  }

  async getEventBySlug(slug: string) {
    return await prismaClient.event.findFirst({
      where: { slug },
    });
  }

  async getEvents(page: number, limit: number, categorie?: string) {
    const [events, totalEvents] = await Promise.all([
      prismaClient.event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          categorie,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.article.count(),
    ]);

    const totalPages = Math.ceil(totalEvents / limit);

    return {
      events,
      totalPages,
    };
  }

  async updateEvent(id: string, eventData: Partial<EventDto>) {
    return await prismaClient.event.update({
      where: { id },
      data: { ...eventData, ongId: undefined }, // Exclude ongId from update
    });
  }

  async destroy(id: string){
    return prismaClient.event.delete({
      where: {
        id,
      },
    });
  }
}

export default EventRepository;
