import React, { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { User, Users, GitFork, Star } from "lucide-react";

const GitCommand = () => {
  interface UserStats {
    username: string;
    name: string | null;
    totalRepos: number;
    avatarUrl: string;
    following: number;
    followers: number;
  }

  interface ContributionDay {
    contributionCount: number;
    date: string;
  }

  interface ContributionWeek {
    contributionDays: ContributionDay[];
  }

  interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
  }

  const [stats, setStats] = useState<UserStats | null>(null);
  const [contributions, setContributions] =
    useState<ContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const octokit = new Octokit({
        auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
      });

      try {
        const userDetails = await octokit.request("GET /user");

        const username = userDetails.data.login;
        const name = userDetails.data.name;
        const totalRepos =
          userDetails.data.public_repos +
          (userDetails.data.total_private_repos ?? 0);
        const avatarUrl = userDetails.data.avatar_url;
        const following = userDetails.data.following;
        const followers = userDetails.data.followers;

        setStats({
          username,
          name,
          totalRepos,
          avatarUrl,
          following,
          followers,
        });

        const contributionQuery = `
          query {
            user(login: "${username}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `;

        const contributionData = (await octokit.graphql(contributionQuery)) as {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                totalContributions: number;
                weeks: {
                  contributionDays: {
                    contributionCount: number;
                    date: string;
                  }[];
                }[];
              };
            };
          };
        };

        setContributions(
          contributionData.user.contributionsCollection.contributionCalendar
        );
      } catch (error: any) {
        console.error(
          `Error! Status: ${error.status}. Message: ${error.response?.data?.message}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!stats || !contributions) {
    return (
      <div className="text-center p-4 text-red-500">
        Error fetching GitHub data
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <div className="flex flex-col items-start gap-6 flex-wrap md:flex-nowrap">
        {/* Profile Section */}
        <div className="w-full flex bg-transparent items-center gap-6">
          <img
            src={stats.avatarUrl}
            alt="User Avatar"
            className="rounded-full w-32 h-32"
          />
          <div className="flex flex-col justify-center">
            <div>
              <div className="text-xl font-bold text-white">{stats.name}</div>
              <p className="text-sm text-gray-100">@{stats.username}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center py-2 rounded-lg">
                <div className="flex items-center  gap-2">
                  <Users className="w-4 h-4 text-gray-100" />
                  <span className="font-semibold text-gray-100">
                    {stats.followers}
                  </span>
                </div>
                <p className="text-xs text-gray-100 mt-1">Followers</p>
              </div>
              <div className="text-center py-2 rounded-lg">
                <div className="flex items-center  gap-2">
                  <User className="w-4 h-4 text-gray-100" />
                  <span className="font-semibold text-gray-100">
                    {stats.following}
                  </span>
                </div>
                <p className="text-xs text-gray-100 mt-1">Following</p>
              </div>
              <div className="text-center py-2 rounded-lg col-span-2">
                <div className="flex items-center  gap-2">
                  <GitFork className="w-4 h-4 text-gray-100" />
                  <span className="font-semibold text-gray-100">
                    {stats.totalRepos}
                  </span>
                </div>
                <p className="text-xs text-gray-100 mt-1">Repositories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution Section */}
        <div className="flex-1">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Contribution Activity
            </div>
            <p className="text-sm text-gray-500">
              {contributions.totalContributions.toLocaleString()} contributions
              in the last year
            </p>
          </div>
          <div>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(53, 13px)",
                gap: "2px",
                border: "1px solid #333",
                borderRadius: "5px",
                padding: "5px",
              }}
            >
              {contributions.weeks.map((week, weekIndex) =>
                week.contributionDays.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    style={{
                      borderRadius: "20%",
                      width: "13px",
                      height: "13px",
                      backgroundColor:
                        day.contributionCount === 0
                          ? "#161b22"
                          : day.contributionCount <= 4
                          ? "#0e4429"
                          : day.contributionCount <= 8
                          ? "#006d32"
                          : day.contributionCount <= 12
                          ? "#26a641"
                          : "#39d353",
                    }}
                    title={`Date: ${day.date}\nContributions: ${day.contributionCount}`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitCommand;
