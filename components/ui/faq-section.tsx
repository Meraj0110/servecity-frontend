import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
const dd = [
  {
    question: "How do I book a service?",
    answer:
      "Simply choose the service you need, select a time slot, and confirm your booking. A verified professional will be assigned instantly.",
  },
  {
    question: "Are your professionals background-verified?",
    answer:
      "Yes, every professional goes through ID verification, skill checks, and training before joining our platform.",
  },
  {
    question: "What if I need to reschedule or cancel my booking?",
    answer:
      "You can reschedule or cancel from your profile anytime before the service begins — with zero extra charges.",
  },
  {
    question: "How do you ensure service quality?",
    answer:
      "We onboard only trained experts, track real-time service performance, and collect customer feedback after every job.",
  },
  {
    question: "Do I need to provide any tools or materials?",
    answer:
      "No, our professionals bring all required equipment and supplies. If any special materials are needed, you’ll be informed beforehand.",
  },
];
function FAQ() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  This is the start of something new
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods. Our goal is to streamline SMB trade, making it easier
                  and faster than ever.
                </p>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {dd.map((_, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>{_.question}</AccordionTrigger>
                <AccordionContent>{_.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ };
