import { CheckCircle2 } from "lucide-react";
import HomeImg from "./_assets/home.png";
import { checklistItems } from "./_constant";
import Image from "next/image";

function Workflow() {
  return (
    <section id="workflow" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-center text-3xl font-bold sm:text-5xl">
          Accelerate your <span className="text-primary">content workflow</span>
        </h2>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ul className="space-y-6">
              {checklistItems.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
              <Image
                src={HomeImg}
                alt="AI content generator dashboard mockup"
                width={900}
                height={600}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Workflow;
