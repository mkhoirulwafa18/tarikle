import { NextResponse } from "next/server";

export async function GET(
) {
    try {

        // const colors = await prismadb.color.findMany({
        //     where: {
        //         storeId: params.storeId
        //     }
        // });

        return NextResponse.json({ "success": "true", "wafa": "mantep bang" });
    } catch (error) {
        console.log('[COLORS_GET]', error)
        return new NextResponse("Internal error", { status: 500 });
    }
}