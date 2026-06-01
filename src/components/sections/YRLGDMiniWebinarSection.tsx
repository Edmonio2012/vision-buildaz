export function YRLGDMiniWebinarSection(): JSX.Element {
  return (
    <section className="w-full">
      <div className="bg-[#1f295f] px-6 py-10 text-center sm:px-8 md:py-11">
        <h2 className="[font-family:'Trirong',serif] text-[34px] font-bold italic leading-tight text-white sm:text-[39px] md:text-[43px]">
          Mini Webinar
        </h2>
      </div>

      <div className="flex flex-col items-center gap-7 bg-white px-6 py-10 text-center sm:px-8 md:py-11">
        <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[25px] font-semibold italic leading-tight text-[#132151] sm:text-[32px] md:text-[38px]">
          A 7–10 minute teaching: 3 Signs You’re Closer Than You Think.
        </p>
        <a
          className="flex min-h-[50px] w-full max-w-[292px] items-center justify-center bg-[#a4890b] px-4 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
          href="https://static.wixstatic.com/mp3/7fb596_bd476b206a17431cb683c8504f15d15d.m4a"
          rel="noreferrer noopener"
          target="_blank"
        >
          Download MP4
        </a>

        <p className="pt-9 [font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[25px] font-semibold italic leading-tight text-[#132151] sm:text-[32px] md:text-[38px]">
          A brief episode from the You Ready? Let&apos;s Grow! Podcast show.
        </p>
        <a
          className="flex min-h-[50px] w-full max-w-[292px] items-center justify-center bg-[#a4890b] px-4 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
          href="https://video.wixstatic.com/video/7fb596_d2d7fc4b7be9456c94a10c422f6af60d/720p/mp4/file.mp4"
          rel="noreferrer noopener"
          target="_blank"
        >
          Download Podcast
        </a>
      </div>
    </section>
  );
}
