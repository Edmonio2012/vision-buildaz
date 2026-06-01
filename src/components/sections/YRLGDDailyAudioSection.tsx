export function YRLGDDailyAudioSection(): JSX.Element {
  return (
    <section className="w-full">
      <div className="bg-[#1f295f] px-6 py-10 text-center sm:px-8 md:py-11">
        <h2 className="[font-family:'Trirong',serif] text-[34px] font-bold italic leading-tight text-white sm:text-[39px] md:text-[43px]">
          Daily Audio
        </h2>
      </div>

      <div className="flex flex-col items-center gap-8 bg-white px-6 py-7 text-center sm:px-8 md:py-8">
        <p className="[font-family:'dinneuzeitgroteskltw01-_812426',sans-serif] text-[25px] font-semibold italic leading-tight text-[#132151] sm:text-[32px] md:text-[38px]">
          A short motivational message to strengthen your momentum.
        </p>
        <a
          className="flex min-h-[49px] w-full max-w-[292px] items-center justify-center bg-[#a4890b] px-4 text-center [font-family:'Poppins',sans-serif] text-[19px] font-medium leading-tight text-white transition hover:bg-[#927904] sm:text-[22px]"
          href="https://video.wixstatic.com/video/7fb596_2b33a6e4827e4e789573a956369eabe5/1080p/mp4/file.mp4"
          rel="noreferrer noopener"
          target="_blank"
        >
          Download Motivational Message
        </a>
      </div>
    </section>
  );
}
