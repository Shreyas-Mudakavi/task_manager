import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, isCompleted, isImportant } =
      await req.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields!",
        status: 400,
      });
    }

    if (title?.length < 3) {
      return NextResponse.json({
        error: "Title must atleast 3 characters long.",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
        userId,
      },
    });

    return NextResponse.json({ task: task, status: 201 });
  } catch (error) {
    console.log("error on creating tasks ", error);
    return NextResponse.json({ error: "Error creating task!", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({ where: { userId } });

    return NextResponse.json({ tasks: tasks, status: 200 });
  } catch (error) {
    console.log("error on getting tasks ", error);
    return NextResponse.json({ error: "Error getting task!", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { isCompleted, id } = await req.json();

    const task = await prisma.task.update({
      where: { id },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json({ task: task, status: 200 });
  } catch (error) {
    console.log("error on updating tasks ", error);
    return NextResponse.json({ error: "Error updating task!", status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
  } catch (error) {
    console.log("error on deleting tasks ", error);
    return NextResponse.json({ error: "Error deleting task!", status: 500 });
  }
}
