import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

const resumeUrl = new URL("../resume/resume.yaml", import.meta.url);
const resume = parse(readFileSync(resumeUrl, "utf8"));

const getFirstNonEmptyLine = (input: string) =>
  input
    .split("\n")
    .map(line => line.trim())
    .find(line => line.length > 0) ?? "";

const escapeForRegex = (input: string) => input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const resumeName = resume.basics.name;
const resumeLabel = resume.basics.label;
const resumeSummaryFirstLine = getFirstNonEmptyLine(resume.basics.summary);

const expectedTitle = `${resumeName} - ${resumeLabel}`;

const ogDescriptionRegex = new RegExp(escapeForRegex(resumeSummaryFirstLine));

const { describe } = test;

describe("Resume Head", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page).toHaveTitle(expectedTitle);
  });

  test("has open graph", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      expectedTitle,
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      ogDescriptionRegex,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "/og-image.png");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "profile");
  });

  test("has meta info", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await expect(page.locator('meta[name="author"]')).toHaveAttribute("content", resumeName);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      resumeLabel,
    );
  });
});
