import { describe, expect, it } from "vitest";
import { addService, flipService, invalidFields } from "./quote";

const complete = { name: "Juan Dela Cruz", email: "juan@shop.ph", message: "I need an online store." };

describe("invalidFields", () => {
  it("accepts a complete request", () => {
    expect(invalidFields(complete)).toEqual([]);
  });

  it("flags every empty required field, in form order", () => {
    expect(invalidFields({ name: "", email: "", message: "" })).toEqual(["name", "email", "message"]);
  });

  it("treats whitespace-only answers as empty", () => {
    expect(invalidFields({ ...complete, name: "   ", message: "\n\t " })).toEqual(["name", "message"]);
  });

  it.each(["juan", "juan@shop", "@shop.ph", "juan@shop.", "juan dela@shop.ph"])("rejects the email %j", (email) => {
    expect(invalidFields({ ...complete, email })).toEqual(["email"]);
  });

  it("ignores spaces around an otherwise valid email", () => {
    expect(invalidFields({ ...complete, email: "  juan@shop.ph " })).toEqual([]);
  });
});

describe("addService", () => {
  it("ticks a service that is not ticked yet, keeping the others", () => {
    expect(addService(["Website"], "Automation")).toEqual(["Website", "Automation"]);
  });

  it("never unticks: an already-ticked service returns the same array", () => {
    const selected = ["Website", "Automation"] as const;
    expect(addService(selected, "Automation")).toBe(selected);
  });
});

describe("flipService", () => {
  it("ticks an unticked service", () => {
    expect(flipService([], "AI Solutions")).toEqual(["AI Solutions"]);
  });

  it("unticks a ticked service, keeping the others", () => {
    expect(flipService(["Website", "Automation"], "Website")).toEqual(["Automation"]);
  });
});
