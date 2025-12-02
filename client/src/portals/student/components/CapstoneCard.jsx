import React, { useState } from 'react';
import {
  Github,
  Award,
  Loader2,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  Trophy,
  Globe,
} from 'lucide-react';

import { useSubmitAssignment } from '../hooks';

const CapstoneCard = ({ capstone, courseId, allModulesCompleted, onComplete }) => {
  const [githubLink, setGithubLink] = useState(capstone?.githubLink || '');
  const [liveLink, setLiveLink] = useState(capstone?.liveLink || '');
  const [isSubmitted, setIsSubmitted] = useState(
    capstone?.isSubmitted || capstone?.isCompleted || false,
  );
  const [submissionStatus, setSubmissionStatus] = useState(
    capstone?.submissionStatus || (capstone?.isSubmitted ? 'submitted' : 'pending'),
  );

  const { submit, loading: submitting, error: submitError } = useSubmitAssignment();

  const isLocked = !allModulesCompleted;

  const isValidGithubUrl = url => {
    try {
      new URL(url);
      return url.includes('github.com');
    } catch {
      return false;
    }
  };

  const isValidUrl = url => {
    if (!url) return true; // Optional field
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValidGithubUrl(githubLink)) {
      return;
    }

    try {
      const response = await submit({
        courseId,
        isCapstone: true,
        githubLink,
        liveLink: liveLink || '',
      });

      if (response.success) {
        setIsSubmitted(true);
        setSubmissionStatus('submitted');
        onComplete?.();
      }
    } catch (err) {
      console.error('Capstone submission failed:', err);
    }
  };

  // Locked state
  if (isLocked) {
    return (
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 opacity-70">
        <div className="text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} className="text-zinc-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-400 mb-2">Capstone Project</h2>
          <p className="text-zinc-500 mb-6">{capstone?.title || 'Final Capstone Project'}</p>

          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <p className="text-yellow-400 text-sm flex items-center justify-center gap-2">
              <Lock size={16} />
              Complete all modules to unlock the capstone project
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Already submitted state
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy size={40} className="text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Capstone Project</h2>
          <p className="text-zinc-400 mb-6">
            {submissionStatus === 'approved'
              ? 'Your capstone project has been approved!'
              : submissionStatus === 'graded'
                ? 'Your capstone project has been graded!'
                : 'Capstone project submitted successfully!'}
          </p>

          {/* Submission Details */}
          <div className="bg-zinc-800 rounded-lg p-4 mb-6 text-left space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Github size={16} className="text-zinc-400" />
                <span className="text-sm text-zinc-400">GitHub Repository:</span>
              </div>
              <a
                href={githubLink || capstone?.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm break-all"
              >
                {githubLink || capstone?.githubLink}
                <ExternalLink size={14} className="shrink-0" />
              </a>
            </div>
            {(liveLink || capstone?.liveLink) && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe size={16} className="text-zinc-400" />
                  <span className="text-sm text-zinc-400">Live Demo:</span>
                </div>
                <a
                  href={liveLink || capstone?.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 flex items-center gap-2 text-sm break-all"
                >
                  {liveLink || capstone?.liveLink}
                  <ExternalLink size={14} className="shrink-0" />
                </a>
              </div>
            )}
          </div>

          {/* Grade & Feedback (if graded) */}
          {(submissionStatus === 'graded' || submissionStatus === 'approved') &&
            capstone?.grade && (
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-green-400 font-medium">Grade:</span>
                  <span className="text-lg font-bold text-green-400">{capstone.grade}</span>
                </div>
                {capstone?.feedback && (
                  <div>
                    <span className="text-sm text-green-400 font-medium">Feedback:</span>
                    <p className="text-sm text-zinc-300 mt-1">{capstone.feedback}</p>
                  </div>
                )}
              </div>
            )}

          {/* Status Badge */}
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${
                  submissionStatus === 'approved'
                    ? 'bg-green-500'
                    : submissionStatus === 'graded'
                      ? 'bg-blue-500'
                      : submissionStatus === 'submitted'
                        ? 'bg-yellow-500'
                        : 'bg-zinc-500'
                }`}
              ></span>
              <span className="capitalize">{submissionStatus}</span>
            </div>
          </div>

          {/* Certificate Request Section */}
          {submissionStatus === 'approved' && (
            <div className="mt-6 p-4 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award size={20} className="text-blue-400" />
                <span className="font-bold text-white">Ready for Certificate!</span>
              </div>
              <p className="text-sm text-zinc-400 mb-4">
                Your capstone is approved. Request your certificate now.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all">
                Request Certificate
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Open state - ready to submit
  return (
    <div className="max-w-2xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award size={40} className="text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Capstone Project</h2>
        <h3 className="text-lg text-zinc-300 mb-4">{capstone?.title || 'Final Project'}</h3>

        {capstone?.description && (
          <div className="text-zinc-400 mb-6 max-w-lg mx-auto text-left">
            <p className="text-base">{capstone.description}</p>
          </div>
        )}

        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-8">
          <p className="text-yellow-200 text-sm">
            <strong>Note:</strong> Submit your GitHub repository link containing your complete
            capstone project code, along with a demo video and screenshots in the repository README.
            You can also provide a live demo link (optional).
          </p>
        </div>

        {/* GitHub Link Input */}
        <div className="w-full mb-4">
          <label className="block text-sm font-medium text-zinc-200 mb-2 text-left">
            GitHub Repository Link <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Github
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
            />
            <input
              type="url"
              value={githubLink}
              onChange={e => setGithubLink(e.target.value)}
              placeholder="https://github.com/username/capstone-project"
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
          </div>
          {githubLink && !isValidGithubUrl(githubLink) && (
            <p className="text-red-400 text-sm mt-2 text-left flex items-center gap-1">
              <AlertCircle size={14} />
              Please enter a valid GitHub repository link
            </p>
          )}
        </div>

        {/* Live Link Input (Optional) */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-zinc-200 mb-2 text-left">
            Live Demo Link <span className="text-zinc-500">(Optional)</span>
          </label>
          <div className="relative">
            <Globe
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400"
            />
            <input
              type="url"
              value={liveLink}
              onChange={e => setLiveLink(e.target.value)}
              placeholder="https://your-project.vercel.app"
              className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
            />
          </div>
          {liveLink && !isValidUrl(liveLink) && (
            <p className="text-red-400 text-sm mt-2 text-left flex items-center gap-1">
              <AlertCircle size={14} />
              Please enter a valid URL
            </p>
          )}
        </div>

        {submitError && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={
            !githubLink ||
            !isValidGithubUrl(githubLink) ||
            (liveLink && !isValidUrl(liveLink)) ||
            submitting
          }
          className={`w-full py-3 rounded-lg font-medium text-white transition-all flex items-center justify-center gap-2 ${
            submitting
              ? 'bg-zinc-600 cursor-wait'
              : githubLink && isValidGithubUrl(githubLink) && (!liveLink || isValidUrl(liveLink))
                ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500'
                : 'bg-zinc-600 cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Trophy size={18} />
              Submit Capstone Project
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CapstoneCard;
