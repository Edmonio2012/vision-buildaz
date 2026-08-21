import { BrandHeader } from "@/components/layout/BrandHeader";
import { Copyright } from "@/components/layout/Copyright";
import { EditorialPage } from "@/components/layout/EditorialPage";
import { Link } from "react-router-dom";

export function ProjectsPage(): JSX.Element {
  return (
    <>
      <BrandHeader />
      <EditorialPage
        eyebrow="VISION TO ACTION"
        imageAlt="Vision Buildaz books and resources"
        imageHeight={628}
        imageSrc="/images/assets/books-promo-founder.png"
        imageWidth={504}
        lead="Vision Buildaz projects turn personal growth, education, and community support into practical resources people can use."
        subtitle="Books. Courses. Conversations."
        title="Projects"
        aside={
          <div className="rounded-[32px] border border-[#d7c8a0] bg-[#efe4c8] px-6 py-8 text-[#1f2a54]">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8a7521]">
              Featured Path
            </p>
            <p className="mt-4 text-[16px] leading-[1.85] text-[#374151]">
              Start with the digital classroom for guided lessons, planning tools, and next-step
              clarity.
            </p>
            <Link
              className="mt-6 inline-flex min-h-[50px] items-center justify-center rounded-full bg-[#1f295f] px-6 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d3976]"
              to="/youreadyletsgrowdigital"
            >
              Explore Classroom
            </Link>
          </div>
        }
      >
        <div className="space-y-6 text-[16px] leading-[1.9] text-[#374151] sm:text-[17px]">
          <p>
            Current Vision Buildaz work centers on resources that help people build from the inside
            out: books, guided digital learning, live teaching, and community conversations.
          </p>
          <p>
            Each project points back to the same message: before the millions, before the platform,
            and before the public win, the person doing the building has to become whole.
          </p>
          <p>
            More featured projects can be added here as new Vision Buildaz resources, events, and
            partnerships go live.
          </p>
        </div>
      </EditorialPage>
      <Copyright />
    </>
  );
}
