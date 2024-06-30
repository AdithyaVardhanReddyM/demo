import { Progress } from "@/components/ui/progress";
import mockResumeData from "@/db/mockdata";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";
import { CalendarClock, Link, Mail, MapPin, Phone, Star } from "lucide-react";
import PersonalForm from "@/components/PersonalForm";
import { redirect } from "next/navigation";
import EducationForm from "@/components/EducationForm";
import { db } from "@/db";
import { education } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {};

const page = async (props: Props) => {
  const mockdata = mockResumeData;
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const eduData = await db
    .select()
    .from(education)
    .where(eq(education.userId, user.id));
  return (
    <div className="flex">
      <div className="border border-blue-500 w-[60%] p-8 m-3 bg-white shadow-lg">
        <header className="mb-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-4xl font-bold text-blue-800">
                {`${mockdata.personalDetails.firstName} ${mockdata.personalDetails.lastName}`}
              </h1>
              <h2 className="text-xl text-orange-500 font-semibold">
                {mockdata.personalDetails.jobRole}
              </h2>
            </div>
            <div>
              <Image
                src={user?.imageUrl!}
                alt="profile-photo"
                height={50}
                width={50}
                className="rounded-full border border-orange-500"
              />
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <div className="flex gap-1 items-center">
              <Phone size={15} color="orange" />
              <span>{mockdata.personalDetails.mobile}</span>
            </div>
            <div className="flex gap-1 items-center">
              <Mail size={15} color="orange" />
              <span>{mockdata.personalDetails.email}</span>
            </div>
            <div className="flex gap-1 items-center">
              <Link size={15} color="orange" />
              <span>{mockdata.personalDetails.portfolio}</span>
            </div>
          </div>
        </header>

        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">SUMMARY</h3>
          <p className="text-sm">{mockdata.personalDetails.overallSummary}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">EDUCATION</h3>
          {eduData.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between">
                <div className="text-orange-500 text-xl font-semibold">
                  {edu.institutionName}
                </div>
                <span className="font-semibold text-lg">
                  {edu.educationType}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock size={15} color="orange" />
                <p>{`${edu.startDate.getFullYear()} - ${edu.endDate?.getFullYear()}`}</p>
              </div>
              {edu.description}
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">EXPERIENCE</h3>
          {mockdata.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="text-orange-500 font-semibold text-xl">
                  {exp.company}
                </div>
                <span className="font-semibold text-lg">{exp.position}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarClock size={15} color="orange" />
                <p>{`${exp.startDate.getFullYear()} - ${exp.endDate?.getFullYear()}`}</p>
              </div>
              <div className="flex gap-1 items-center">
                <MapPin size={15} className="text-blue-500" />
                <p className="text-sm text-blue-500">{exp.location}</p>
              </div>
              <p className="text-sm italic mb-2">{exp.description}</p>
              <ul className="list-disc list-inside text-sm">
                {JSON.parse(exp.responsibilities).map(
                  (resp: string, idx: string) => (
                    <li key={idx}>{resp}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">PROJECTS</h3>
          {mockdata.projects.map((pro, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-center">
                <div className="text-orange-500 font-semibold text-xl">
                  {pro.name}
                </div>
                {/* <span className="font-semibold text-lg">{exp.position}</span> */}
                <p className="text-sm text-blue-500">{pro.url}</p>
              </div>
              {/* <span className="">{`${startDate.getFullYear()} - ${exp.endDate?.getFullYear()}`}</span> */}
              <p className="text-sm italic mb-2">{pro.description}</p>
              <ul className="list-disc list-inside text-sm">
                {JSON.parse(pro.features).map((resp: string, idx: string) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-6">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">TECH SKILLS</h3>
          <div className="flex flex-wrap gap-4">
            {mockdata.skills.map((skill, index) => (
              <div key={index} className="bg-orange-200 px-2 py-1 rounded ">
                {skill.skillType}
                <Progress
                  value={skill.expertise * 20}
                  className="m-1 text-orange-400 w-40"
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold text-blue-800 mb-2">
            MOST PROUD OF
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {mockdata.achievements.map((ach, index) => (
              <div key={index}>
                <div className="text-orange-500 font-semibold flex items-center gap-1">
                  <Star size={20} />
                  {ach.title}
                </div>
                <div className="text-sm">{ach.description}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="h-full p-4 w-[40%]">
        <div>
          <h1 className="text-orange-500 mb-2 font-semibold">
            Personal Details
          </h1>
          <PersonalForm />
        </div>
        <div className="mt-6">
          <h1 className="text-orange-500 mb-2 font-semibold">
            Education Details
          </h1>
          <EducationForm />
        </div>
      </div>
    </div>
  );
};

export default page;
